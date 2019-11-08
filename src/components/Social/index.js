import React from 'react';

import Wrapper from './Wrapper';
import BlogIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Button from '@material-ui/core/Button';

function Social({ website, twitter, github, linkedin }) {
  return (
    <Wrapper>
      <Button href="/" startIcon={<BlogIcon />}>
        Blog Index
      </Button>
      {website && (
        <Button href={website} target="_blank" rel="noopener" startIcon={<HomeIcon />}>
          RiceGeo.dev
       </Button>
      )}
      {twitter && (
        <Button href={twitter} target="_blank" rel="noopener" startIcon={<TwitterIcon />}>
          Twitter
        </Button>
      )}
      {github && (
        <Button href={github} target="_blank" rel="noopener" startIcon={<GitHubIcon />}>
          GitHub
       </Button>
      )}
      {linkedin && (
        <Button href={linkedin} target="_blank" rel="noopener" startIcon={<LinkedInIcon />}>
          LinkedIn
        </Button>
      )}
    </Wrapper>
  );
}

export default Social;
