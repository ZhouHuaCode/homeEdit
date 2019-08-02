cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        moveNode: {
            default: null,
            type: cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    
    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;

        this.isCardPressed = false;
        this.touchPrePt = cc.Vec2();
        this.touchPreNodePt = this.moveNode.getPosition();
        this.preNodeScale = 1.0
        this.wheelPrecision = 0.02;

        this.moveNode.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.moveNode.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.moveNode.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.moveNode.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        this.moveNode.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
    },

    // called every frame
    update: function (dt) {

    },

    _onTouchBegan: function (event) {
        this.isCardPressed = true;
        var touch = event.touch;
        this.touchPrePt = touch.getLocation();
        this.touchPreNodePt = this.moveNode.getPosition();
        cc.log("PreNodePt" + this.touchPreNodePt)
    },

    _onTouchMove: function (event) {
        if(!this.isCardPressed){
            return;
        }
        // moveNode
        var touch = event.touch;
        this.touchMovePt = touch.getLocation();
        var subVec = this.touchMovePt.sub(this.touchPrePt)
        // var addVec = this.touchPreNodePt.add(subVec)
        // cc.log("subVec" + subVec)
        // cc.log("addVec" + addVec)
        this.moveNode.setPosition(this.touchPreNodePt.add(subVec));
    },

    _onTouchEnded: function (event) {
        this.isCardPressed = false;
    },
    
    _onTouchCancel: function (event) {
        this.isCardPressed = false;
        var touch = event.touch;
        // touch.getLocation().y
    },

    _onMouseWheel: function (event) {
        // this.preNodeScale = 1.0
        // this.wheelPrecision = 0.05;

        if ( event.getScrollY() > 0 && this.preNodeScale < 2.0){
            this.preNodeScale += this.wheelPrecision
        }else if ( event.getScrollY() < 0 && this.preNodeScale > 0.8 ){
            this.preNodeScale -= this.wheelPrecision
        }
        this.moveNode.setScale(this.preNodeScale)

        // touch.getLocation().y
    },
});
