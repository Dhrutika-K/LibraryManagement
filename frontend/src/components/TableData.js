import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { returnReq } from "../actions/Issue_action";
import { useDispatch } from 'react-redux';

const TableData = ({ book, fetchDataAgain }) => {
    let dateFrom;
    let dayDiff;

    if (book) {
        // Calculate the return date by adding 7 days to the created date
        let result = new Date(book.createdAt);
        result.setDate(result.getDate() + 7);
        dateFrom = result;

        // Calculate the difference in days between today and the return date
        const today = moment(new Date());
        const end = moment(result);
        const duration = moment.duration(today.diff(end));
        dayDiff = duration.asDays();
    }

    const dispatch = useDispatch();

    const clearIssuedBook = (bookId, userId, due) => {
        dispatch(returnReq(bookId, userId, due));
        fetchDataAgain();
    };

    return (
        <tr style={{padding:'10px'}}>
            <td style={{padding:'10px'}}>{book.title}</td>
            <td style={{padding:'10px'}}>{book.author}</td>
            <td style={{padding:'10px'}}>{book.userName}</td>
            <td style={{padding:'10px'}}>{book.userBranch}</td>
            <td style={{padding:'10px'}}><Moment format="YYYY-MM-DD">{book.createdAt}</Moment></td>
            <td style={{padding:'10px'}}><Moment format="YYYY-MM-DD">{dateFrom}</Moment></td>
            <td style={{padding:'10px'}}>{Math.floor(dayDiff) > 0 ? Math.floor(dayDiff) * 15 : 0}</td>
            <td style={{padding:'10px'}}>
                <button 
                    onClick={() => clearIssuedBook(book.bookId, book.userId, Math.floor(dayDiff) > 0 ? Math.floor(dayDiff) * 15 : 0)} 
                    className="btn btn-danger">
                    Clear
                </button>
            </td>
        </tr>
    );
};

export default TableData;
