import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe pipe tests', () => {
  const pipe = new DateFormatPipe();
  it('Should format date when date object is passed', () => {
    const date = new Date('2018-06-08 15:38');
    expect(pipe.transform(date)).toEqual('2018/06/08 15:38');
  });

  it('Should format date when date string is passed', () => {
    const date = '2018-06-08 15:38';
    expect(pipe.transform(date)).toEqual('2018/06/08 15:38');
  });
});
