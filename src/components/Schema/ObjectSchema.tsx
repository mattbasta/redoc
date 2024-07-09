import { observer } from 'mobx-react';
import * as React from 'react';

import { SchemaModel } from '../../services/models';

import { SchemaProps } from './Schema';

import { FieldList } from '../FieldList/FieldList';

export interface ObjectSchemaProps extends SchemaProps {
  discriminator?: {
    fieldName: string;
    parentSchema: SchemaModel;
  };
}

export const ObjectSchema = observer(
  ({
    schema: { fields = [], title },
    showTitle,
    skipReadOnly,
    skipWriteOnly,
  }: ObjectSchemaProps) => {
    const filteredFields = React.useMemo(
      () =>
        skipReadOnly || skipWriteOnly
          ? fields.filter(
              item =>
                !(
                  (skipReadOnly && item.schema.readOnly) ||
                  (skipWriteOnly && item.schema.writeOnly)
                ),
            )
          : fields,
      [skipReadOnly, skipWriteOnly, fields],
    );

    return <FieldList title={showTitle ? title : undefined} rows={filteredFields} />;
  },
);
