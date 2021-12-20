import React from 'react';

const Rank = ({name,entries}) => {
    return (
        <div>
            <div className='darkest-gray b f3'>
                { name + ' your current count ...'}
            </div>
            <div className='darkest-gray f1'>
                { entries}
            </div>
        </div>
    );
}

export default Rank;