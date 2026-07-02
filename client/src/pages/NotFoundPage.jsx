import React from 'react';
import { ButtonLink } from '../components/common/Button';
import PageContainer from '../components/layout/PageContainer';

export function NotFoundPage() {
  return (
    <PageContainer
      eyebrow="404"
      title="This frame does not exist"
      description="The page may have moved, or the address may be incomplete."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/">Return home</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">Contact support</ButtonLink>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
