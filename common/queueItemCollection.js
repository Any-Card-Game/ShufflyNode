
 //generic for pushers and watchers
var queueItemCollection = function (queueItems) {

    if (!(queueItems instanceof Array)) {
        this.queueItems = queueItems ? [queueItems] : [];
    } else {
        this.queueItems = queueItems;
    }



    this.getByChannel = function (channel) {
        for (var i = 0; i < this.queueItems.length; i++) {
            if (this.queueItems[i].channel == channel) {
                return this.queueItems[i];
            }
        }

    };

}

module.exports = queueItemCollection;