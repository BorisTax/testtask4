import React from 'react';
import './style.css';

export default class Main extends React.Component {
  static letters="ABCDEFGH";
  static numbers="12345678";
  constructor(){
    super();
    this.state={moves:[],error:false};
  }
  isValid(position){
    if(position.length!=2) return false;
    if(Main.letters.includes(position[0])&&Main.numbers.includes(position[1])) return true;
    return false;
  }
  getMoves(position){
    let i=Main.letters.indexOf(position[0])+1;
    let j=position[1];
    let res=[];
    for(let i0=i-2;i0<=i+2;i0++)
      for(let j0=j-2;j0<=j+2;j0++)
        if(i0>0&&i0<9&&j0>0&&j0<9)
          if(Math.abs((i-i0)*(j-j0))==2) res.push(Main.letters[i0-1]+j0);
    return res;   
  }
  onClick(){
    let position=document.querySelector('#input').value.trim();
    let res={};
    res.error=!this.isValid(position);//проверка на правильность ввода
    if(!res.error) res.moves=this.getMoves(position); //рассчет возможных ходов
    this.setState(res); 
  }
  onChange(){
    //очищаем поле вывода результата при редактировании
    this.setState({moves:[],error:false});
  }
  render(){
    return <div className="main" >
              Исходное положение:<br/>
              <input id="input" onChange={this.onChange.bind(this)}/>
              <br/><br/>
              <input type="button" value="Ок" onClick={this.onClick.bind(this)} />
              <br/>
              <div className="result">{this.state.error===true?'Ошибка ввода':(this.state.moves.length>0?"Возможные варианты хода: \n"+this.state.moves.join(" "):"")}</div>
      </div>
  
  }
}


