import React from 'react';
import { ButtonLink } from '../components/common/Button';
import PageContainer from '../components/layout/PageContainer';

export function ServerErrorPage() {
  return (
    <PageContainer
      eyebrow="500"
      title="The studio hit an unexpected problem"
      description="The service could not complete this view. Return home or try again after a moment."
    >
      <ButtonLink to="/">Return home</ButtonLink>
    </PageContainer>
  );
}

export default ServerErrorPage;
