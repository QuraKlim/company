import './app-info.css'

const AppInfo = ({data}) => {
    const all = data.length;
    const allRise = data.filter(i => i.increase).length;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в комапнии Q</h1>
            <h2>Общее число сотрудников: {all}</h2>
            <h2>Премию получат: {allRise}</h2>
        </div>
    )
}

export default AppInfo