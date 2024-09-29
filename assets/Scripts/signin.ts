const {ccclass, property} = cc._decorator;

@ccclass
export default class menu extends cc.Component {

    @property(cc.EditBox)
    email_box: cc.EditBox = null;

    @property(cc.EditBox)
    password_box: cc.EditBox = null;

    start () {
        let exitbtn = new cc.Component.EventHandler();
        exitbtn.target = this.node;
        exitbtn.component = "signin";
        exitbtn.handler = "loadGameScene";

        cc.find("Canvas/SigninPage/ExitButton").getComponent(cc.Button).clickEvents.push(exitbtn);


        let enterbtn = new cc.Component.EventHandler();
        enterbtn.target = this.node;
        enterbtn.component = "signin";
        enterbtn.handler = "login";

        cc.find("Canvas/SigninPage/EnterButton").getComponent(cc.Button).clickEvents.push(enterbtn);
    }

    login(){
        console.log(this.email_box.string);

        // try {
        //     await firebase.auth.signInWithEmailAndPassword(this.email_box.string, this.password_box.string);
        //     //
        // } catch (error) {
        //     //
        // }
        firebase.auth().signInWithEmailAndPassword(this.email_box.string, this.password_box.string).then(()=> {
            cc.director.loadScene("select");
        }).catch(function(error) {
            alert('帳號或密碼錯誤!');
        });
    }

    loadGameScene(){
        cc.director.loadScene("menu");
    }
   
}