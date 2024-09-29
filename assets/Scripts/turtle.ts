import GameMgr from "./GameMgr";
import mushroom from "./mushroom";
import Player from "./player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class turtle extends cc.Component
{
    // @property
    // moveDir: number = -1;

    @property
    isDied: boolean = false;

    @property
    ismove: boolean = false;

    @property(cc.AudioClip)
    turtle_die: cc.AudioClip = null;

    private anim: cc.Animation = null;
    private moveDir: number = null;

    start() {
        this.moveDir = -1;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-20, 0);
        this.anim = this.getComponent(cc.Animation);
        this.node.scaleX = -1 * this.moveDir;
    }

    update(dt) {

        //console.log(this.getComponent(cc.RigidBody).linearVelocity.x);

        if(!this.isDied){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveDir * 20, 0);
            
            if(!this.anim.getAnimationState("turtle_move").isPlaying){
                this.anim.play("turtle_move");
            }
        }

        if(this.ismove){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveDir * 100, 0);
        }
    }

    onBeginContact(contact, self, other){

        if(other.node.name == "mushroom"){
            console.log("errrrrr");
        }

        if(other.node.name == "Mario"){

            console.log(this.isDied);

            if(this.node.y+10 < other.node.y-10 && this.isDied==false && !other.node.getComponent(Player).isDied){

                this.isDied = true;


                this.anim.stop();
                this.anim.play("turtle_die")

                other.node.getComponent(Player).score = other.node.getComponent(Player).score + 200;


                // self.sensor = true;
                // self.apply();
                //this.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
                //console.log(self.node.getComponent(cc.RigidBody).linearVelocity.x);
                //self.apply();
                //console.log(this.isDied);
            }

            else if(this.isDied && !this.ismove){
                this.ismove = true;
                this.moveDir = (this.node.x > other.node.x)? 1 : -1;
            }

            else if(this.node.y+10 < other.node.y-10 && this.isDied==true && !other.node.getComponent(Player).isDied){
                this.isDied = true;
                self.sensor = true;
                self.apply();
                console.log('here');
                //this.anim.stop();
                cc.audioEngine.playEffect(this.turtle_die,false);
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);

                other.node.getComponent(Player).score = other.node.getComponent(Player).score + 400;
                //cc.audioEngine.playEffect(this.mushroom_die,false);

                //console.log(this.node.getComponent(cc.RigidBody).linearVelocity.x);


                setTimeout(()=>{
                    this.node.destroy();
                   //  this.rebornPos();
                }, 200);
            }

            else {
                setTimeout(()=>{
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200, 0);
                }, 2000);

                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(20, 0);
            }
            
        }

        else if(other.node.name == "mushroom"){
            //console.log("errrrrr");
        }

        else if(other.node.name == "block" || other.node.name == "pipe"){
            //console.log('pong');
            this.moveDir = (this.moveDir==1) ? -1 : 1;
            //this.node.scaleX = -1 * this.moveDir;
            setTimeout(() => {
                this.node.scaleX = (this.node.scaleX==-1) ? 1 : -1;
            }, 20)
        }
    }
}