// import * as crypto  from "crypto";
import crypto  from "crypto";

console.log("hello world ? ")

class Block {
  public hash: string;
  constructor(public prevHash:string, public height:number, public data:string) {
    this.hash = Block.getHash(prevHash, height, data);
  }

  static getHash(prevHash:string, height:number, data:string) {
    const makeBefore = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(makeBefore).digest('hex');
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  
  private getLastBlockHash() : string {
    if( this.blocks.length === 0 ) {
      return '';
    }else {
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  public add(data: string) : void {
    const newBlock = new Block(this.getLastBlockHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }
  public get() : Block[];
  public get(fHash:string) : Block | undefined;
  public get(fHash?:string) : Block | undefined | Block[]{
    if( fHash === undefined ) {
      return [...this.blocks];
    } else {
      this.blocks.forEach((block) => {
        if( block.hash === fHash )  return block;
      } );
      return undefined;
    }
  }

}

const blockChain = new BlockChain();
blockChain.add('111');
blockChain.add('222');
blockChain.add('111');
blockChain.add('333');
blockChain.add('111');

console.log(blockChain.get());