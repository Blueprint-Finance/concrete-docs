import React from 'react';
import {SiteJsonLd} from '../../components/SeoJsonLd';

export default function Root({children}) {
  return (
    <>
      <SiteJsonLd />
      {children}
    </>
  );
}
