import React, { Component } from 'react';
import { Col, Row, Layout } from 'antd';

import { getTop } from '../services/api.service';

import ArtistList from './ArtistList';
import { Text } from './LanguageManager';


const { Content } = Layout;


function artistsSort(type) {
  return (a, b) => {
    if (a.pos[type] < b.pos[type]) return -1;
    if (a.pos[type] > b.pos[type]) return 1;
    return 0;
  };
}


function filterArtists(artists) {
  const long = [];
  const medium = [];
  const short = [];

  Object.keys(artists).forEach((k) => {
    const artist = artists[k];
    const { pos } = artist;

    if (pos.long) long.push(artist);
    if (pos.medium) medium.push(artist);
    if (pos.short) short.push(artist);
  });

  long.sort(artistsSort('long'));
  medium.sort(artistsSort('medium'));
  short.sort(artistsSort('short'));

  return { long, medium, short };
}


class ArtistsDetails extends Component {
  state = {
    loading: true,
  }

  async componentWillMount() {
    const { artists } = await getTop();

    const { long, medium, short } = filterArtists(artists);

    this.setState({
      long,
      medium,
      short,
      loading: false,
    });
  }


  render() {
    const {
      long,
      medium,
      short,
      loading,
    } = this.state;
    return (
      <Content style={{ minHeight: '92vh' }}>
        <Row type="flex" gutter={5} style={{ margin: 10 }}>
          <Col xs={24} xl={8} style={{ marginTop: 10 }}>
            <ArtistList
              artists={short}
              pagination={{ pageSize: 5 }}
              type="short"
              title={(
                <Text dicio={{
                  en: 'Last Month',
                  pt: 'Último Mês',
                }}
                />
              )}
              loading={loading}
            />
          </Col>
          <Col xs={24} xl={8} style={{ marginTop: 10 }}>
            <ArtistList
              artists={medium}
              pagination={{ pageSize: 5 }}
              type="medium"
              title={(
                <Text dicio={{
                  en: 'Last 6 Months',
                  pt: 'Últimos 6 Meses',
                }}
                />
              )}
              loading={loading}
            />
          </Col>
          <Col xs={24} xl={8} style={{ marginTop: 10 }}>
            <ArtistList
              artists={long}
              pagination={{ pageSize: 5 }}
              type="long"
              title={(
                <Text dicio={{
                  en: 'Always',
                  pt: 'Desde Sempre',
                }}
                />
              )}
              loading={loading}
            />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default ArtistsDetails;
