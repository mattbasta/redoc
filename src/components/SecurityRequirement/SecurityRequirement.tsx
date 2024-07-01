import * as React from 'react';
import { SecurityRequirementModel } from '../../services/models/SecurityRequirement';
import { useStore } from '../StoreBuilder';
import { FieldList } from '../FieldList/FieldList';

export interface SecurityRequirementsProps {
  securities: SecurityRequirementModel[];
}

export function SecurityRequirements(props: SecurityRequirementsProps) {
  const store = useStore();

  const { securities } = props;

  if (!securities?.length || store?.options.hideSecuritySection) {
    return null;
  }

  const operationSecuritySchemes = store?.spec.securitySchemes.schemes.filter(({ id }) => {
    return securities.find(security => security.schemes.find(scheme => scheme.id === id));
  });
  if (!operationSecuritySchemes?.length) {
    return null;
  }

  return (
    <FieldList
      title="Authentication"
      rows={operationSecuritySchemes.map(scheme => {
        let headerName: string;
        let description: string;
        switch (scheme.type) {
          case 'http':
            headerName = 'Authorization';
            switch (scheme.http?.scheme) {
              case 'bearer':
                description =
                  'Use the HTTP `Authorization` header with the `Bearer` scheme with an API key.';
                break;
              case 'basic':
                description =
                  'Use HTTP `Authorization` header with basic auth using the API credentials you were provided.';
                break;
              default:
                description = 'Unknown HTTP security scheme';
                break;
            }
            break;
          default:
            headerName = 'n/a';
            description = 'Unknown security type';
            break;
        }
        return { name: headerName, description };
      })}
    />
  );

  // return (
  //   <>
  //     {operationSecuritySchemes.map((scheme, idx) => (
  //       <SecurityDetailsStyle key={idx}>
  //         <h5>
  //           <LockIcon /> {AUTH_TYPES[scheme.type] || scheme.type}: {scheme.id}
  //         </h5>
  //         <Markdown source={scheme.description || ''} />
  //         <SecurityDetails
  //           key={scheme.id}
  //           scheme={scheme}
  //           RequiredScopes={<RequiredScopesRow scopes={getRequiredScopes(scheme.id, securities)} />}
  //         />
  //       </SecurityDetailsStyle>
  //     ))}
  //   </>
  // );
}

// const LockIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11">
//     <path
//       fill="currentColor"
//       d="M18 10V6A6 6 0 0 0 6 6v4H3v14h18V10h-3zM8 6c0-2.206 1.794-4 4-4s4 1.794 4 4v4H8V6zm11 16H5V12h14v10z"
//     />
//   </svg>
// );

// function getRequiredScopes(id: string, securities: SecurityRequirementModel[]): string[] {
//   const allScopes: string[] = [];
//   let securitiesLength = securities.length;

//   while (securitiesLength--) {
//     const security = securities[securitiesLength];
//     let schemesLength = security.schemes.length;
//     while (schemesLength--) {
//       const scheme = security.schemes[schemesLength];
//       if (scheme.id === id && Array.isArray(scheme.scopes)) {
//         allScopes.push(...scheme.scopes);
//       }
//     }
//   }

//   return Array.from(new Set(allScopes));
// }
