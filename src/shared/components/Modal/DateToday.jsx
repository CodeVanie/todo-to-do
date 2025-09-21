import { getDateTodayString } from "../../../utils/date-utils";

export default function DateToday() {
    return (
        <p className="text-xs text-center font-bold">
            <span>Today: </span>{getDateTodayString()}
        </p>
    )
}