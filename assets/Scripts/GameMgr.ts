import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component
{
    @property(cc.Node)
    background: cc.Node = null;

    @property(Player)
    player: Player = null;

    @property(cc.Node)
    timeCounter: cc.Node = null;

    @property
    broadcostTimes: number = 180;
    //

    private phsicManger: cc.PhysicsManager = null;
    private score: number = 0;
    private hightestScore: number = 0;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;

    onLoad()
    {
        this.phsicManger = cc.director.getPhysicsManager();
        this.phsicManger.enabled = true;
        this.phsicManger.gravity = cc.v2(0,-250);
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start()
    {
        this.schedule(this.doCountdownTime,1);
        this.player.node.scaleX = 1;
    }

    doCountdownTime(){
        if (this.broadcostTimes > 0 ) {
            this.broadcostTimes -= 1;
            this.countDownShow(this.broadcostTimes);

            this.timeCounter.getComponent(cc.Label).string = this.broadcostTimes.toString();

            if(this.broadcostTimes==0) cc.director.loadScene('gameover');
        }
        // else{
        //     cc.director.loadScene('gameover');
        // }
    }

    countDownShow(temp:number){

        if(temp <= 0){
            this.unschedule(this.doCountdownTime);
        }
    }

    onKeyDown(event)
    {
        if(event.keyCode == cc.macro.KEY.up){
            //console.log('jump!');
            this.player.playerJump();
        }
        if(event.keyCode == cc.macro.KEY.right){
            this.rightDown = true;
            this.player.playerMove(1);
            this.player.node.scaleX = 1;
        }
        else if(event.keyCode == cc.macro.KEY.left){
            this.leftDown = true;
            this.player.playerMove(-1);
            this.player.node.scaleX = -1
        }
    }


    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = false;
                //if(this.rightDown)
                    //this.player.playerMove(1);
                //else
                    this.player.playerMove(0);
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                //if(this.leftDown)
                    //this.player.playerMove(-1);
                //else
                    this.player.playerMove(0);
                //break;
        }
    }

}