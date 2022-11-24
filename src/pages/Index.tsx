const Index = () => {
    return (
        <div>
            Hello, {localStorage.getItem("name")}
        </div>
    )
}

export default Index;