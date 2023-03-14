import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, BaseLayout, Chart } from "../components";
import { getDetail } from "../api";
import { Card } from '@mui/material';

export function DetailPage({ id = '', timeRange = '' }) {
  const params = useParams<{ id: string, timeRange: string }>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const _id = params.id || id;
    const _timeRange = params.timeRange || timeRange;

    getDetail(_id, _timeRange).then((response) => {
      if (response.data) setData(response.data);
    });
  }, [id, params.id, timeRange, params.timeRange]);

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