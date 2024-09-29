import { GameManager } from "./menuGameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class gameover extends cc.Component {

    @property(GameManager)
    GameMgr: GameManager = null;

    

    start () {
        let menubtn = new cc.Component.EventHandler();
        menubtn.target = this.node;
        menubtn.component = "gameover";
        menubtn.handler = "loadMenuScene";

        cc.find("Canvas/Menu_Button").getComponent(cc.Button).clickEvents.push(menubtn);

        let retrybtn = new cc.Component.EventHandler();
        retrybtn.target = this.node;
        retrybtn.component = "gameover";
        retrybtn.handler = "loadRetryScene";
        cc.find("Canvas/Retry_Button").getComponent(cc.Button).clickEvents.push(retrybtn);
    }

    loadMenuScene(){
        cc.director.loadScene("select");
    }

    loadRetryScene(){
        cc.director.loadScene("gamestart")
    }
   
}
