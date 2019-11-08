import React from 'react';

import H2 from '../H2';
import Wrapper from './Wrapper';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';


function Share({ title, url }) {
  const encodedURL = encodeURI(url);
  const text = encodeURI(title);
  return (
    <Wrapper>
      <H2>Share This Post</H2>
      <IconButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank" rel="noopener" aria-label="Share on Facebook">
        <FacebookIcon fontSize="large" />
      </IconButton>
      <IconButton
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedURL}`}
        target="_blank" rel="noopener" aria-label="Share on Twitter">
        <TwitterIcon fontSize="large" />
      </IconButton>
      <IconButton
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${text}`}
        target="_blank" rel="noopener" aria-label="Share on Twitter">
        <LinkedInIcon fontSize="large" />
      </IconButton>
      <IconButton
        href={`mailto:?subject=${text}&body=${encodedURL}`}
        rel="noopener" aria-label="Share on Twitter">
        <EmailIcon fontSize="large" />
      </IconButton>
    </Wrapper>
  );
}

export default Share;
