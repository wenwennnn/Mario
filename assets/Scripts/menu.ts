import { GameManager } from "./menuGameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class menu extends cc.Component {

    @property(GameManager)
    GameMgr: GameManager = null;

    

    start () {
        let signinbtn = new cc.Component.EventHandler();
        signinbtn.target = this.node;
        signinbtn.component = "menu";
        signinbtn.handler = "loadSigninScene";

        cc.find("Canvas/LoginButton").getComponent(cc.Button).clickEvents.push(signinbtn);

        let signupbtn = new cc.Component.EventHandler();
        signupbtn.target = this.node;
        signupbtn.component = "menu";
        signupbtn.handler = "loadSignupScene";
        cc.find("Canvas/SignupButton").getComponent(cc.Button).clickEvents.push(signupbtn);
    }

    loadSigninScene(){
        cc.director.loadScene("signin");
    }

    loadSignupScene(){
        cc.director.loadScene("signup")
    }
   
}
