const Error = (props) => {
    const { error } = props;
    return (
        <div className="error">
            <p>{error.message}</p>
            <p>please refresh the page</p>
        </div>
    );
};

export default Error;
