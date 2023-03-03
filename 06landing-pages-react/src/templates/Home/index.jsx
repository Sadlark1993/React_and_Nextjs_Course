import { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { Base } from '../Base';
import { mockBase } from '../Base/stories';
import * as Styled from './styles';
import { mapData } from '../../api/map-data';
import { PageNotFound } from '../PageNotFound';
import { Loading } from '../Loading';

import { GridTwoColumns } from '../../components/GridTwoColumns';
import { GridContent } from '../../components/GridContent';
import { GridText } from '../../components/GridText';
import { GridImage } from '../../components/GridImage';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetch('http://localhost:1337/api/pages/?slug=landing-page&populate=deep');
        const dataObj = await data.json();
        const dataPage = mapData(dataObj);
        setData(dataPage[0]);
        //console.log(dataPage[0]);
      } catch (e) {
        setData(undefined);
      }
    };

    load();
  }, []);

  if (data === undefined) return <PageNotFound />;
  if (data && !data.slug) {
    return <Loading />;
  }

  const { menu, sections, html: footerHtml } = data;
  const { link, links, text, img } = menu;

  return (
    <Base links={links} footerHtml={footerHtml} logoData={{ text, link, srcImg: undefined }}>
      {sections.map((section, i) => {
        if (section.component === 'section.section-two-columns') {
          return <GridTwoColumns key={i} {...section} />;
        } else if (section.component === 'section.section-content') {
          return <GridContent key={i} {...section} />;
        } else if (section.component === 'section.section-grid-text') {
          return <GridText key={i} {...section} />;
        } else if (section.component === 'section.section-grid-image') {
          return <GridImage key={i} {...section} />;
        }
        return 1;
      })}
    </Base>
  );
}

export default Home;
