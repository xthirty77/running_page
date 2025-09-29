import logoPic from '@/static/logo_pic.jpg';

interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const data: ISiteMetadataResult = {
  siteTitle: 'Running Page',
  siteUrl: 'https://xthirty77.github.io/running_page/',
  logo: logoPic,
  description: 'Personal site and blog',
  navLinks: [
    {
      name: 'Summary',
      url: 'summary',
    },
  ],
};

export default data;
