import './CreateButton.scss'
import addIcon from '../../assets/add.svg'

export default function CreateButton({ onClick }){
    return (
        <div className="cont">
            <button className="create__button" onClick={onClick}>
                <img src={addIcon} alt="Create" />
            </button>
        </div>
    )
}