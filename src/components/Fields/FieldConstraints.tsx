import * as React from 'react';
import { ConstraintItem } from '../../common-elements/fields';

export interface ConstraintsViewProps {
  constraints: string[];
}

export const ConstraintsView = ({ constraints }: ConstraintsViewProps) => {
  if (constraints.length === 0) {
    return null;
  }
  return (
    <>
      {constraints.map(constraint => (
        <ConstraintItem key={constraint}>{constraint}</ConstraintItem>
      ))}
    </>
  );
};
