import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { usePromiseTracker } from 'react-promise-tracker';
import { css } from '@emotion/core';

const Result = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div>
      {promiseInProgress === true ? (
        <BarLoader css={override} size={150} color={'#0698d9'} />
      ) : (
        <div>
          <a href={props.resultLink}>
            <button className="button turn-blue">{props.text}</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Result;
