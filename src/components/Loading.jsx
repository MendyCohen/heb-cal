import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
  <ReactLoading type='bubbles' color='grey' height={60} width={70} className='loadingComponent'/>
);

export default Loading;

// import React from 'react';
// import { Placeholder } from 'semantic-ui-react';
//
// const Loading = () => (
//   <Placeholder>
//     <Placeholder.Header>
//       <Placeholder.Line />
//       <Placeholder.Line />
//     </Placeholder.Header>
//   </Placeholder>
// );
//
// export default Loading
