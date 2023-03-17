import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, BaseLayout, Chart } from "../components";
import { getMain } from "../api";
import { Card } from '@mui/material';
import { TimeRangeContext, TimeRangeContextType } from '../context/timeRange';
import { TimeRange } from '../types';

export function MainPage({ timeRange = '' }) {
  const params = useParams<{ timeRange: string }>();
  const [data, setData] = useState<any>({});
  const { selectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;
  const _timeRange = selectedValue || timeRange || params.timeRange;

  useEffect(() => {
    getMain(_timeRange).then((response) => {
      if (response.data) setData(response.data);
    });
    // eslint-disable-next-line
  }, [selectedValue]);

  const isDay = _timeRange === TimeRange.MONTH || _timeRange === TimeRange.WEEK;
  const chartTitle = `Traffic ${isDay ? '/ day' : '/ hour'}`;

  return (
    <BaseLayout>
      {data && (
        <Card sx={{ boxShadow: 'rgb(0 0 0 / 20%) 1px 1px 2px', padding: '10px', marginBottom: '40px' }}>
          <Chart
            data={data.data}
            labels={data.labels}
            title={chartTitle}
          />
        </Card>
      )}
      {data && data.articles?.map((article: any, index: number) => {
        return (
          <Link to={`/articles/${_timeRange}/${index + 1}`} style={{ textDecoration: 'none' }}>
            <Article
              id={article.id}
              author={article.author}
              image={article.image_url}
              traffic={article.totalTraffic}
              url={article.url}
            />
          </Link>
        )
      })}
    </BaseLayout>
  )
}