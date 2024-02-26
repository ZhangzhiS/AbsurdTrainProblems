import Singleton from "../Base/Singleton";


interface IItem {
	func: Function;
	ctx: unknown;
}

export default class EventManger extends Singleton {
	static get Instance() {
		return super.GetInstance<EventManger>();
	}

	private eventDic: Map<string, Array<IItem>> = new Map();

	on(event: string, func: Function, ctx?: unknown) {
		// 绑定
		if (this.eventDic.has(event)) {
			this.eventDic.get(event).push({ func, ctx });
		} else {
			this.eventDic.set(event, [{ func, ctx }]);
		}
	}

	off(event: string, func: Function) {
		// 解绑
		if (this.eventDic.has(event)) {
			const index = this.eventDic.get(event).findIndex(i => i.func === func);
			index > -1 && this.eventDic.get(event).splice(index, 1)
		}

	}

	emit(event: string, ...params: unknown[]) {
		// 调用
		if (this.eventDic.has(event)) {
			this.eventDic.get(event).forEach(({ func, ctx }) => {
				ctx ? func.apply(ctx, params) : func(...params);
			});
		}
	}
	clear() {
		this.eventDic.clear();
	}
}