import React, { useState } from 'react';
import Try from './try';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
const NumberBaseball = () => {
  console.log('NumberBaseball 컴포넌트 리렌더링');
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTryies] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!');
      setTryies((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTryies([]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTryies([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTryies((prevTries) => {
          return [
            ...prevTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다` },
          ];
        });
        setValue('');
      }
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // class numberBaseball extends Component {
  //   state = {
  //     result: '',
  //     value: '',
  //     answer: getNumbers(),
  //     tries: [],
  //   };
  //   onSubmitForm = (e) => {
  //     e.preventDefault();
  //     if (this.state.value === this.state.answer.join('')) {
  //       this.setState({
  //         result: '홈런!',
  //         tries: [
  //           ...this.state.tries,
  //           { try: this.state.tries, result: '홈런!' },
  //         ],
  //       });
  //       alert('게임을 다시 시작합니다!');
  //       this.setState({
  //         value: '',
  //         answer: getNumbers(),
  //         tries: [],
  //       });
  //     } else {
  //       const answerArray = this.state.value.split('').map((v) => parseInt(v));
  //       let strike = 0;
  //       let ball = 0;
  //       if (this.state.tries.length >= 9) {
  //         this.setState({
  //           result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
  //             ','
  //           )}였습니다!`,
  //         });
  //         alert('게임을 다시 시작합니다!');
  //         this.setState({
  //           value: '',
  //           answer: getNumbers(),
  //           tries: [],
  //         });
  //       } else {
  //         for (let i = 0; i < 4; i++) {
  //           if (answerArray[i] === this.state.answer[i]) {
  //             strike += 1;
  //           } else if (this.state.answer.includes(answerArray[i])) {
  //             ball += 1;
  //             console.log(ball);
  //           }
  //         }
  //         this.setState({
  //           tries: [
  //             ...this.state.tries,
  //             { try: this.state.value, value: `${strike}` },
  //           ],
  //           value: '',
  //         });
  //       }
  //     }
  //   };
  //   onChangeInput = (e) => {
  //     this.setState({ value: e.target.value });
  //   };

  // render() {}
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
