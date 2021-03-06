import React, { Component, Fragment } from 'react';
import { Card, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { getTop } from '../services/api.service';

import { Text } from './LanguageManager';
import TopChart from './TopChart';

function reverseObj(objParam) {
  const obj = { ...objParam };
  const objKeys = Object.keys(obj);
  const objCount = objKeys.length - objKeys.filter(k => obj[k] === null).length;

  objKeys.forEach((k) => {
    if (obj[k] !== null) obj[k] = objCount - (obj[k] - 1) || null;
  });

  return obj;
}

function setData(data) {
  let dataLong = {};
  let dataMedium = {};
  let dataShort = {};

  Object.keys(data).forEach((k) => {
    const obj = data[k];
    const { pos } = obj;

    dataLong[obj.name] = pos.long;
    dataMedium[obj.name] = pos.medium;
    dataShort[obj.name] = pos.short;
  });

  dataLong = reverseObj(dataLong);
  dataMedium = reverseObj(dataMedium);
  dataShort = reverseObj(dataShort);

  dataLong.xAxisChart = 'Always';
  dataMedium.xAxisChart = 'Last 6 Months';
  dataShort.xAxisChart = 'Last Month';

  return [dataLong, dataMedium, dataShort];
}

class Top extends Component {
  static propTypes = {
    history: PropTypes.object, // eslint-disable-line
  }

  state = {
    loading: true,
  }

  async componentWillMount() {
    const top = await getTop();


    const trackData = setData(top.tracks);
    const artistData = setData(top.artists);

    this.setState({ trackData, artistData, loading: false });
  }

  render() {
    const { loading, trackData, artistData } = this.state;
    const { history } = this.props;
    return (
      <Fragment>
        <Col xs={24} lg={12} style={{ marginTop: 10 }}>
          <Card
            title={(
              <Text
                dicio={{
                  en: 'Top 20 - Tracks',
                  pt: 'Top 20 - Músicas',
                }}
              />
            )}
            extra={(
              <Button type="link" onClick={() => history.push('/tracks')}>
                <Text
                  dicio={{
                    en: 'More Info',
                    pt: 'Lista Detalhada',
                  }}
                />
              </Button>
            )}
            footer={(
              <div>
                <b>STATSFY</b>
              </div>
            )}
            loading={loading}
          >
            <div style={{ height: '70vh' }}>
              <TopChart data={trackData} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12} style={{ marginTop: 10 }}>
          <Card
            title={(
              <Text
                dicio={{
                  en: 'Top 20 - Artists',
                  pt: 'Top 20 - Artistas',
                }}
              />
            )}
            extra={(
              <Button type="link" onClick={() => history.push('/artists')}>
                <Text
                  dicio={{
                    en: 'More Info',
                    pt: 'Lista Detalhada',
                  }}
                />
              </Button>
            )}
            footer={(
              <div>
                <b>STATSFY</b>
              </div>
            )}
            loading={loading}
          >
            <div style={{ height: '70vh' }}>
              <TopChart data={artistData} />
            </div>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

export default withRouter(Top);
