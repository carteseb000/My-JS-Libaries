export class Settings {
   static #props = {};
   static get(prop) { return this.#props[prop];}
   static set(prop, value) {
       if (!Object.getOwnPropertyDescriptors(this)[prop]) {
           Object.defineProperty(this, prop, {
               configurable: true,
               enumerable: true,
               get:()=>this.#props[prop],
               set:(val)=>{this.#props[prop]=val;}
           });
       }
       this.#props[prop] = value;
   }
   static remove(prop) { delete this.#props[prop]; }
}
export class Level {
    constructor() {
        this.setup();
    }
    setup = async () => {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.setScreenSize();
    }
    run() {
        drawRect(this.ctx,0,0,window.innerWidth, window.innerHeight, {fillStyle:'White'});
        drawCircle(this.ctx, Pointer.pos.x, Pointer.pos.y, 10, 0, Math.PI*2, {fillStyle:'red'});
        Pointer.pos;
    }
    setScreenSize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        this.canvas.width = w;
        this.canvas.height = h;
    }
}
export class Pointer {
   static #x;
   static #y;

   static init() {
       this.#x = 0;
       this.#y = 0;
       window.addEventListener('mousemove', this.mousemove);
       window.addEventListener('mousedown', this.mousedown);
       window.addEventListener('mouseup', this.mouseup);
   }
   static set pos({x,y}) { this.#x = x; this.#y = y;}
   static get pos() { return { x:this.#x, y:this.#y};}
   static mousemove = (e) => {
       this.pos = {x:e.pageX, y:e.pageY};
   }
   static mousedown = (e) => {
       this.pos = {x:e.pageX, y:e.pageY};
   }
   static mouseup = (e) => {
       //
   }
}
export class Game {
   constructor() {
       this.level = new Level();
       this.previousTime = Date.now();

       Pointer.init();

       this.run();
   }
   run = () => {
       let newtime = Date.now();
       Settings.dt = (newtime - this.previousTime) / 1000;
       this.previousTime = newtime;

       this.level.run();

       requestAnimationFrame(this.run);
   }
}
export const drawCircle = (ctx,x,y,r,a1,a2,options) => {
   Object.assign(ctx,options);
   ctx.beginPath();
   ctx.arc(x,y,r,a1,a2);
   ctx.closePath();
   ctx.fill();
}
export const drawRect = (ctx,x,y,w,h,options) => {
   Object.assign(ctx,options);
   ctx.beginPath();
   ctx.rect(x,y,w,h);
   ctx.closePath();
   ctx.fill();
}
