import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Article, BaseLayout, Chart } from "../components";
import { getDetail } from "../api";
import { Card } from '@mui/material';
import { TimeRangeContext, TimeRangeContextType } from '../context/timeRange';

export function DetailPage({ id = '', timeRange = '' }) {
  const params = useParams<{ id: string, timeRange: string }>();
  const [data, setData] = useState<any>({});
  const { selectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;

  useEffect(() => {
    const _id = id || params.id || '';
    const _timeRange = selectedValue || timeRange || params.timeRange;

    getDetail(_id, _timeRange).then((response) => {
      if (response.data) setData(response.data);
    });
  }, [selectedValue]);

  return (
    <BaseLayout>
      {data && <Article
        author={data.author}
        image={data.image_url}
        traffic={123}
        url={data.url}
      />}
      {data &&
      <Card sx={{ boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 2px', padding: '10px' }}>
        <Chart
          data={data.data}
          labels={data.labels}
          title={'traffic'}
        />
      </Card>}
    </BaseLayout>
  )
}