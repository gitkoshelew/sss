import React from 'react';
import styles from './style.module.scss';

export default function QuestionTable({ tableItems }) {
  return (
    <table>
      <tbody>
        {tableItems.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
