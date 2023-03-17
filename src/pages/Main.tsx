import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Article, BaseLayout, Chart } from "../components";
import { getMain } from "../api";
import { Card } from '@mui/material';
import { TimeRangeContext, TimeRangeContextType } from '../context/timeRange';

export function MainPage({ timeRange = '' }) {
  const params = useParams<{ timeRange: string }>();
  const [data, setData] = useState<any>({});
  const { selectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;

  useEffect(() => {
    const _timeRange = selectedValue || timeRange || params.timeRange;

    getMain(_timeRange).then((response) => {
      if (response.data) setData(response.data);
    });
    // eslint-disable-next-line
  }, [selectedValue]);

  return (
    <BaseLayout>
      {data && (
        <Card sx={{ boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 2px', padding: '10px', marginBottom: '40px' }}>
          <Chart
            data={data.data}
            labels={data.labels}
            title={'traffic'}
          />
        </Card>
      )}
      {data && data.articles?.map((article: any) => {        
        return (
          <Article
            id={article.id}
            author={article.author}
            image={article.image_url}
            traffic={123}
            url={article.url}
          />
        )
      })}
    </BaseLayout>
  )
}