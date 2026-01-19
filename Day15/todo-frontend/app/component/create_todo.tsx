import { Button } from "@/components/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"
import { TodoList } from "./todo_list"
export function CreateTodo() {
    return <main>
        <div className="flex flex-col items-center justify-center mt-20 gap-6 ">
            <h1 className="border w-fit px-5 py-3 rounded-3xl ">Simple. Elegant. Easy.</h1>
        </div>

        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
            <h1 className="text-4xl">Each day is a treasure chest filled with limitless opportunities,<br /> take joy in checking many off your list.</h1>
        </div>

        <div className="border w-2xl m-auto mt-20 rounded-lg ">
            <div className=" flex w-full items-center justify-between p-2 gap-4">
                <input type="text" placeholder="Enter your task..." className="w-full gap-4 p-2 focus:outline-none" />
                <Button variant="outline" size="icon">
                    <CircleFadingArrowUpIcon />
                </Button>
            </div>
        </div>

        <TodoList />

    </main>
}