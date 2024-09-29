const {ccclass, property} = cc._decorator;

@ccclass
export default class menu extends cc.Component {

    @property(cc.EditBox)
    username: cc.EditBox = null;

    @property(cc.EditBox)
    useremail: cc.EditBox = null;

    @property(cc.EditBox)
    userpassword: cc.EditBox = null;

    start () {
        console.log('0330');
        let exitbtn = new cc.Component.EventHandler();
        exitbtn.target = this.node;
        exitbtn.component = "signup";
        exitbtn.handler = "loadGameScene";

        cc.find("Canvas/SignupPage/ExitButton").getComponent(cc.Button).clickEvents.push(exitbtn);

        let enterbtn = new cc.Component.EventHandler();
        enterbtn.target = this.node;
        enterbtn.component = "signup";
        enterbtn.handler = "signup";

        cc.find("Canvas/SignupPage/EnterButton").getComponent(cc.Button).clickEvents.push(enterbtn);
    }

    signup(){
        if(this.username!=null && this.useremail!=null && this.userpassword!=null){
            console.log('hi');
            var username = this.username.string;
            firebase.auth().createUserWithEmailAndPassword(this.useremail.string, this.userpassword.string).catch(function(error) {
                // Handle Errors here.
                alert(error);
                console.log('here')
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(errorMessage);
                throw error;
            })
            .then(() =>
                //console.log(this.username.string);
                firebase.auth().onAuthStateChanged(function() {
                    var user = firebase.auth().currentUser;
                    //console.log(user);

                    user.updateProfile({ displayName: username}).then(() => {
                        firebase.database().ref('Users/'+ username + '/').set({
                            Best_score: 0,
                            stage: 1,
                            life: 5,
                            name: username,
                            stage_1: 0,

                        });
                        cc.director.loadScene("select");
                    })
                })
            )
        }
        else{
            alert('請填入應填的資料!')
        }
    }

    loadGameScene(){
        cc.director.loadScene("menu");
    }
   
}