import moment from 'moment';
import axios from 'axios';


export async function GET(request: Request) {
    return new Response((await isJewishRestDay(moment("2023-06-10"))).toString());
}

const isJewishRestDay = async (date: moment.Moment): Promise<boolean> => {
    const formattedDate = date.format('YYYY-MM-DD');
    console.log(date.year())
    console.log(formattedDate)
    const url = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&year=${date.year()}&month=x&ss=on&mf=on&s=on`;
  
    try {
      const response = await axios.get(url);
      const holidays = response.data.items;

     console.log(holidays.length)
      for (const holiday of holidays) {
        console.log(holiday.date,holiday.category)
        if (holiday.date === formattedDate && (holiday.category === 'holiday' || holiday.category === 'candles')) {
          return true;
        }
      }
  
      return false;
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      return false;
    }
  }