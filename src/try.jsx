// 클래스 퓨어컴포넌트
// import React, { PureComponent } from 'react';

// class Try extends PureComponent {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

//함수형 컴포넌트 React.memo로 감싸기 혹은 함수를 memo로 감싸기
import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  console.log('Try 컴포넌트 리렌더링');
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
