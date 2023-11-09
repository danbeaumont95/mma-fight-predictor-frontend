/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import ProgressLine from './ProgressLine';

export function ProgressBar({ value, max, text }: {value: number; max: number; text: string}) {
  const perc = (value / max) * 100;
  console.log(perc, `perc + ${text}`, { value, max })
  return (
    <div style={{ height: '40px', marginBottom: '20px', width: '200px' }}>
      <ProgressLine
        label={`${text}...`}
        visualParts={[
          {
            percentage: `+${perc}%`,
            color: '#613ddc',
          },
        ]}
      />
    </div>
  )
}
