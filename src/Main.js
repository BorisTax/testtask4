import React from 'react';
import './style.css';

export default class Main extends React.Component {
  static letters=" ABCDEFGH ";
  constructor(){
    super();
    let board=[];
    for(let i=0;i<=7;i++)
      for(let j=0;j<=7;j++)
         board.push({color:(i+j)%2===0?"#eee":"#000",selected:false});
    this.state={board,selected:-1,moves:new Set()};
  }

  getMoves(index){
    let i=Math.trunc(index/8);
    let j=index%8;
    let res=new Set();
    for(let i0=i-2;i0<=i+2;i0++)
      for(let j0=j-2;j0<=j+2;j0++)
        if(i0>=0&&i0<8&&j0>=0&&j0<8)
          if(Math.abs((i-i0)*(j-j0))===2) res.add(i0*8+j0);
    return res;   
  }
  onClick(index){
    let moves=this.getMoves(index);
    this.setState({moves,selected:index}); 
  }

  render(){
      let board=[];
      board.push(Main.letters.split("").map((item)=><div className="pos">{item}</div>));
      for(let i=1;i<=8;i++){
            board.push(<div className="pos">{9-i}</div>);
            board.push(this.state.board.slice((i-1)*8,(i-1)*8+8).map((item,colIndex)=>{
                                  let index=colIndex+(i-1)*8;
                                  let color=item.color;
                                  if(this.state.selected>=0){
                                      color=index===this.state.selected?"blue":this.state.moves.has(index)?"green":color;
                                      }
                                  return <div className="cell" 
                                      onClick={this.onClick.bind(this,index)} 
                                      style={{backgroundColor:color}}>
                                    </div>
                                  }));
            board.push(<div className="pos">{9-i}</div>);
            }
      board.push(Main.letters.split("").map((item)=><div className="pos">{item}</div>));          
      return <div className="main">
              <div className="board" >
                {board}
              </div>
              </div>

        
      
      }
}


