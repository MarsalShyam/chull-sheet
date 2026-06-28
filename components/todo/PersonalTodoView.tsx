"use client";

import React, { useState } from "react";
import { Todo, TodoPriority, ChecklistItem } from "@/lib/repositories/interfaces";
import { 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
} from "lucide-react";

interface PersonalTodoViewProps {
  todos: Todo[];
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
  onUpdateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>) => void;
  onDeleteTodo: (id: string) => void;
}

export default function PersonalTodoView({
  todos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
}: PersonalTodoViewProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("Medium");
  const [dueDate, setDueDate] = useState("");
  
  // Checklist item helper state
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newCheckItem, setNewCheckItem] = useState("");

  const [expandedTodoId, setExpandedTodoId] = useState<string | null>(null);

  const handleAddCheckItem = () => {
    if (newCheckItem.trim()) {
      setChecklist((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          title: newCheckItem.trim(),
          completed: false,
        },
      ]);
      setNewCheckItem("");
    }
  };

  const handleRemoveCheckItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        priority,
        dueDate,
        labels: [],
        checklist,
      });

      // Reset
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setChecklist([]);
      setIsFormOpen(false);
    }
  };

  const handleToggleCompleted = (todo: Todo) => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleToggleChecklist = (todo: Todo, itemId: string) => {
    const updatedChecklist = todo.checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    onUpdateTodo(todo.id, { checklist: updatedChecklist });
  };

  const getPriorityColor = (p: TodoPriority) => {
    if (p === "High") return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    if (p === "Medium") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Sub Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Tasks</h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> New Task
        </button>
      </div>

      {/* Add Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 max-w-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <input
              type="text"
              required
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-655 focus:outline-none cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Checklist Items form section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-[9px] uppercase font-bold text-slate-500">Checklist Items</label>
            
            {checklist.length > 0 && (
              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {checklist.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="text-slate-700">{item.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCheckItem(item.id)}
                      className="text-rose-500 hover:text-rose-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add checklist subtask..."
                value={newCheckItem}
                onChange={(e) => setNewCheckItem(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-750 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCheckItem}
                className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-white font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-550 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      {/* Task List Grid */}
      <div className="space-y-2.5">
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-400 text-xs font-medium">
            You don&apos;t have any personal tasks. Click &quot;New Task&quot; to build your list.
          </div>
        ) : (
          todos.map((todo) => {
            const isExpanded = expandedTodoId === todo.id;
            const completedItems = todo.checklist.filter((c) => c.completed).length;
            const totalItems = todo.checklist.length;

            return (
              <div 
                key={todo.id}
                className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-350 transition-all ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                {/* Main Card Header */}
                <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedTodoId(isExpanded ? null : todo.id)}>
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCompleted(todo);
                      }}
                      className="text-slate-400 hover:text-indigo-600 cursor-pointer shrink-0"
                    >
                      {todo.completed ? (
                        <CheckSquare className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold text-slate-800 truncate ${todo.completed ? "line-through text-slate-450" : ""}`}>
                        {todo.title}
                      </h4>
                      {todo.description && (
                        <p className="text-[10px] text-slate-450 truncate mt-0.5">{todo.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 shrink-0 pl-3">
                    {/* Priority badge */}
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>

                    {/* Progress Checklist Badge */}
                    {totalItems > 0 && (
                      <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                        {completedItems}/{totalItems}
                      </span>
                    )}

                    {/* Expand Trigger */}
                    <button className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-11 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-4">
                    {/* Checklist renderer */}
                    {totalItems > 0 && (
                      <div className="space-y-2">
                        <span className="block text-[9px] uppercase font-bold text-slate-400">Subtask Progress</span>
                        <div className="space-y-2">
                          {todo.checklist.map((item) => (
                            <label key={item.id} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleToggleChecklist(todo, item.id)}
                                className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
                              />
                              <span className={item.completed ? "line-through text-slate-400" : ""}>{item.title}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metadata summary */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400 pt-2 border-t border-slate-100/80">
                      <div className="flex items-center gap-3">
                        {todo.dueDate && (
                          <span className="flex items-center gap-1 font-semibold text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-350" /> Due: {todo.dueDate}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => onDeleteTodo(todo.id)}
                        className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
