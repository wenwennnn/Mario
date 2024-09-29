import GameMgr from "./GameMgr";
import mushroom from "./mushroom";
import turtle from "./turtle";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component
{
    @property()
    playerSpeed: number = 200;

    @property(cc.Node)
    gameMgr: cc.Node = null;

    @property(cc.Node)
    camera: cc.Node = null;

    @property(cc.Node)
    life_lable: cc.Node = null;

    @property(cc.Node)
    score_lable: cc.Node = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.AudioClip)
    die_sound: cc.AudioClip = null;

    @property(cc.AudioClip)
    jump_sound: cc.AudioClip = null;

    @property(cc.AudioClip)
    eat_mush: cc.AudioClip = null;

    @property(cc.AudioClip)
    die_forever: cc.AudioClip = null;

    @property
    isbox: boolean = false;

    @property
    isbox2: boolean = false;

    @property
    isJumping: boolean = false;

    @property
    canMove: boolean = true;

    @property
    score: number = 0;
    

    private idleFrame: cc.SpriteFrame = null;
    private moveDir = 0;
    private anim: cc.Animation = null;
    private rebornPos = null;
    private isDied = false;
    private movepos = null;
    private life_num = null;

    start(){
        this.rebornPos = this.node.position;

        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.getComponent(cc.Animation);

        cc.audioEngine.playMusic(this.bgm, true);

        firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/life').once('value',(snapshot)=>{
            this.life_num = snapshot.val();
            this.life_lable.getComponent(cc.Label).string = snapshot.val();
        })
        firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/stage_1').once('value',(snapshot)=>{
            this.score = snapshot.val();
            this.score_lable.getComponent(cc.Label).string = this.score.toString()
        })
        
    }

    update(dt)
    {
        this.score_lable.getComponent(cc.Label).string = this.score.toString();

        if(this.canMove) this.node.x += this.playerSpeed * this.moveDir * dt;

        this.playerAnimation();

        if(!this.canMove){
            this.node.x = this.movepos;
        }

        if(this.node.x < 480){
            this.camera.x = 0;
        }
        else if(this.node.x > 1440){
            this.camera.x = 960;
        }
        else{
            this.camera.x = this.node.x - 480;
        }

    }

    playerAnimation()
    {
        if(this.isJumping){
            if(!this.anim.getAnimationState("mario_jump").isPlaying){
                this.anim.play("mario_jump");
            }
        }
        else if(this.canMove == false){
            if(!this.anim.getAnimationState("mario_die").isPlaying){
                this.anim.play("mario_die");
            }
        }
        else if(this.moveDir == 0){
            this.anim.stop();
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
        }
        else if(!this.anim.getAnimationState("mario_move").isPlaying){
            this.anim.play("mario_move");
        }
    }

    playerMove(moveDir: number)
    {
        this.moveDir = moveDir;
    }

    playerJump()
    {
        //console.log(this.getComponent(cc.RigidBody).linearVelocity.y)
        if(Math.abs(this.getComponent(cc.RigidBody).linearVelocity.y) < 0.000000000001 && this.canMove){
            cc.audioEngine.playEffect(this.jump_sound,false);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 300);
            this.isJumping = true;
        }
    }

    playerdie(){
        //console.log('in');
        if(this.life_num > 1){
            this.isDied = true;
            cc.audioEngine.pauseMusic();
            cc.audioEngine.playEffect(this.die_sound,false);

            this.life_num--;
            this.life_lable.getComponent(cc.Label).string = this.life_num.toString();

            //this.sensor = true;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,300);

            //setTimeout(()=>{
                //console.log('inhere');

                //this.anim.play("mario_die");
                this.movepos = this.node.x;
                this.canMove = false;
                this.node.scaleX = 1;
            //}, 100);

            setTimeout(()=>{
                this.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
                this.node.position = this.rebornPos;
                cc.audioEngine.resumeMusic();
                this.isDied = false;
                this.canMove = true;
                return;
            }, 2000);
        }
        else {
            //gameover
            this.isDied = true;
            cc.audioEngine.pauseMusic();
            cc.audioEngine.playEffect(this.die_forever,false);

            this.life_num--;
            this.life_lable.getComponent(cc.Label).string = this.life_num.toString();

            //this.sensor = true;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,300);

            //setTimeout(()=>{
                //console.log('inhere');

                //this.anim.play("mario_die");
                this.movepos = this.node.x;
                this.canMove = false;
            //}, 100);

            setTimeout(()=>{
                this.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
                this.node.position = this.rebornPos;
                cc.audioEngine.resumeMusic();
                this.isDied = false;
                this.canMove = true;
                return;
            }, 2000);

            firebase.database().ref('Users/' + firebase.auth().currentUser.displayName).update({
                life: 5,
                stage_1 : 0,
            }).then(() => cc.director.loadScene("gameover"))
        }
    }

    onBeginContact(contact, self, other){

        if(this.isDied){
            contact.disabled = true;
        }

        this.isJumping = false;

        if(other.node.name == "box"){

            if(this.node.y > other.node.y+32 && !this.isbox){
                this.isbox = true;
                other.sensor = false;
                other.apply();
            }
        }
        if(other.node.name == "box2"){

            if(this.node.y > other.node.y+56 && !this.isbox2){
                this.isbox2 = true;
                other.sensor = false;
                other.apply();
            }
        }
        if(other.node.name == "mushroom"){

            console.log(other.node.getComponent(mushroom).isDied, this.isDied);
            //this.node.getComponent(cc.RigidBody).
            //other.node.getComponent(cc.RigidBody).isDied
            if(other.node.y+10 < this.node.y-5){
                //
            }
            else{
                //console.log(other.node.getComponent(mushroom).isDied);
                if(!other.node.getComponent(mushroom).isDied && !this.isDied) this.playerdie();
            }
        }
        if(other.node.name == "turtle"){

            //this.node.getComponent(cc.RigidBody).
            //other.node.getComponent(cc.RigidBody).isDied
            if(other.node.y+10 < this.node.y){
                //
            }
            else{
                if(!this.isDied){
                    if(other.node.getComponent(turtle).isDied && !other.node.getComponent(turtle).ismove){}
                    else this.playerdie();
                }
            }
            // else if(other.node.getComponent(turtle).ismove){
            //     //console.log(other.node.getComponent(mushroom).isDied);
            //     if(!this.isDied) this.playerdie();
            // }
        }
        if(other.node.name == "flower"){
            if(!this.isDied){
                this.playerdie();
            }
        }
        if(other.node.name == "mush"){
            this.life_num = this.life_num + 1;
            this.life_lable.getComponent(cc.Label).string = this.life_num.toString();
            other.node.destroy();
            cc.audioEngine.playEffect(this.eat_mush,false);
            this.score = this.score + 1000;
        }
        if(other.node.name == "lower_bound" && !this.isDied){
            this.playerdie();
        }

        if(other.node.name == "Flag"){
            //cc.director.loadScene("gamestart2");

            var score = this.score;

            firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/Best_score').once('value',(snapshot)=>{
                console.log(snapshot.val(), score);
                if(snapshot.val() < score){
                    console.log("you are high score")
                    firebase.database().ref('Users/' + firebase.auth().currentUser.displayName).update({
                        Best_score: score,
                        stage: 2,
                        life: this.life_num,
                        stage_1: score,
                    })
                }
                else{
                    firebase.database().ref('Users/' + firebase.auth().currentUser.displayName).update({
                        stage: 2,
                        life: this.life_num,
                        stage_1: score,
                    })
                }
            }).then(()=>{cc.director.loadScene("gamestart2");})
        }

        if(other.node.name == "Flag2"){
            var score = this.score;
            firebase.database().ref('Users/' + firebase.auth().currentUser.displayName + '/Best_score').once('value',(snapshot)=>{
                if(snapshot.val() < score){
                    firebase.database().ref('Users/' + firebase.auth().currentUser.displayName).update({
                        Best_score: score,
                        life: this.life_num,
                        stage_1: 0,
                    })
                }
                else{
                    firebase.database().ref('Users/' + firebase.auth().currentUser.displayName).update({
                        life: this.life_num,
                        stage_1: 0,
                    })
                }
            })
            cc.director.loadScene("victory");
        }
    }


    onPostSolve(contact, self, other){
        //console.log('here', other.node.name);

        if(other.node.name == "box" && this.node.y <= other.node.y+32 ){

            this.isbox = false;

            other.sensor = true;
            other.apply();
        }
        if(other.node.name == "box2" && this.node.y <= other.node.y+56 ){

            this.isbox2 = false;

            other.sensor = true;
            other.apply();
        }
    }
}