import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Article, BaseLayout, Chart } from "../components";
import { getDetail } from "../api";
import { Card } from '@mui/material';
import { TimeRangeContext, TimeRangeContextType } from '../context/timeRange';
import { TimeRange } from '../types';

export function DetailPage({ id = '', timeRange = '' }) {
  const params = useParams<{ id: string, timeRange: string }>();
  const [data, setData] = useState<any>({});
  const { selectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;
  const _timeRange = selectedValue || timeRange || params.timeRange;

  useEffect(() => {
    window.scrollTo(0, 0);
    const _id = id || params.id || '';

    getDetail(_id, _timeRange).then((response) => {
      if (response.data) setData(response.data);
    });
    // eslint-disable-next-line
  }, [selectedValue]);

  const isDay = _timeRange === TimeRange.MONTH || _timeRange === TimeRange.WEEK;
  const chartTitle = `Traffic ${isDay ? '/ day' : '/ hour'}`;

  return (
    <BaseLayout>
      {data && (
        <Article
          id={data.id}
          author={data.author}
          image={data.image_url}
          traffic={data.totalTraffic}
          url={data.url}
        />
      )}
      {data && (
        <Card sx={{ boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 2px', padding: '10px' }}>
          <Chart
            data={data.data}
            labels={data.labels}
            title={chartTitle}
          />
        </Card>
      )}
    </BaseLayout>
  )
}