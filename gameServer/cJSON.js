

/**
By Steve Hanov
Released to the public domain


*/



/* CJSON.stringify() to convert from objects to string
CJSON.parse() to convert from string to objects.
More documentation is pending.
*/

(function () {
    /*jslint sub: true */

    // We keep track of object types that we have seen in a tree.
    function NodeItem(parent, key) {
        var self = this;
        self.parent = parent;
        self.key = key;
        self.children = [];
        self.templateIndex = null;
        self.links = [];
        self.follow = function (key) {
            if (key in self.children) {
                return self.children[key];
            } else {
                self.children[key] = new NodeItem(self, key);
                return self.children[key];
            }
        };

    }


    // Given the root of the key tree, process the value possibly adding to the
    // key tree.
    function process(root, value, ignore) {
        var result;
        var i;
        var key;
        var nodeItem;

        if (typeof value === "object") {
            // if it's an array,
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                // process each item in the array.
                result = [];
                for (i = 0; i < value.length; i++) {
                    result.push(process(root, value[i], ignore));
                }
            } else {
                nodeItem = root;
                result = { "": [] };
                // it's an object. For each key,
                for (key in value) {
                    if (ignore.indexOf(key) == -1 && Object.hasOwnProperty.call(value, key)) {
                        // follow the nodeItem.
                        if (root.length>0) {
                            console.log(JSON.stringify(root))
                        }

                        nodeItem = root.follow(key);

                        // add its value to the array.
                        result[""].push(process(root, value[key], ignore));
                    }
                }

                nodeItem.links.push(result);
            }
        } else {
            result = value;
        }

        return result;
    }

    // Given the root of the key tree, return the array of template arrays.
    function createTemplates(root) {
        var templates = [];
        var queue = [];
        var nodeItem;
        var template;
        var cur;
        var i;
        var key;
        var numChildren;

        root.templateIndex = 0;

        for (key in root.children) {
            if (Object.hasOwnProperty.call(root.children, key)) {
                queue.push(root.children[key]);
            }
        }

        // while queue not empty
        while (queue.length > 0) {
            // remove a ode from the queue,
            nodeItem = queue.shift();
            numChildren = 0;

            // add its children to the queue.
            for (key in nodeItem.children) {
                if (Object.hasOwnProperty.call(nodeItem.children, key)) {
                    queue.push(nodeItem.children[key]);
                    numChildren += 1;
                }
            }

            // if the nodeItem had more than one child, or it has links,
            if (numChildren > 1 || nodeItem.links.length > 0) {
                template = [];
                cur = nodeItem;

                // follow the path up from the nodeItem until one with a template
                // id is reached.
                while (cur.templateIndex === null) {
                    template.unshift(cur.key);
                    cur = cur.parent;
                }

                template.unshift(cur.templateIndex);

                templates.push(template);
                nodeItem.templateIndex = templates.length;

                for (i = 0; i < nodeItem.links.length; i++) {
                    nodeItem.links[i][""].unshift(nodeItem.templateIndex);
                }
            }
        }

        return templates;
    }

    function Compress(value, ignore) {
        var root, templates, values;

        root = new NodeItem(null, "");
        values = process(root, value, ignore || []);
        templates = createTemplates(root);

        if (templates.length > 0) {
            return JSON.stringify({ "f": "cjson", "t": templates,
                "v": values
            }, null, null);
        } else {
            // no templates, so no compression is possible.
            return JSON.stringify(value, function (key, value) {

                if (ignore.indexOf(key)) return undefined;

                else return value;
            });
        }
    }

    function getKeys(templates, index) {
        var keys = [];

        console.log(templates);
        while (index > 0) {
            keys = templates[index - 1].slice(1).concat(keys);
            index = templates[index - 1][0];
        }

        console.log(keys);
        return keys;
    }

    function expand(templates, value) {
        var result, i, key, keys;

        // if it's an array, then expand each element of the array.
        if (typeof value === 'object') {
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                result = [];
                for (i = 0; i < value.length; i++) {
                    result.push(expand(templates, value[i]));
                }

            } else {
                // if it's an object, then recreate the keys from the template
                // and expand.
                result = {};
                keys = getKeys(templates, value[""][0]);
                for (i = 0; i < keys.length; i++) {
                    result[keys[i]] = expand(templates, value[""][i + 1]);
                }
            }
        } else {
            result = value;
        }

        return result;
    }

    function Expand(str) {
        var value = JSON.parse(str);
        if (typeof value !== "object" ||
             !("f" in value) ||
             value["f"] !== "cjson") {
            // not in cjson format. Return as is.
            return value;
        }

        return expand(value["t"], value["v"]);
    }

    module.exports = {};
    module.exports.stringify = function (value, ignore) { return new Compress(value, ignore); };
    module.exports.parse = Expand;

})();