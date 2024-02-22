import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addBookToShelf } from '../../redux/actions/bookshelfAction';

export function FavoriteButton({ added, auth,book }) {
    const dispatch = useDispatch()
    const handleOptionClick = (option,user_id, book) => {
        dispatch(addBookToShelf({name:option,user_id, book,auth}));
      };
    return (
      <Button
      onClick={() =>
        handleOptionClick('Favorite Books', auth.user._id, book, auth)
      }
        shape="round"
        size="medium"
        icon={added ? <HeartFilled className='mt-1.5' /> : <HeartOutlined className='mt-1.5' />}
        className='flex justify-center mt-3'
        style={{ background: added ? '#baac9a' : 'white', color: added ? 'white' : 'black' }}
      >
        {added ? 'Added to favorite' : 'Add to favorite'}   
      </Button>
    );
  }
  