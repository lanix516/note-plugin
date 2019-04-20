var vm = new Vue({
    el: "#layout",
    data: {
        note: "",
        day: "今日",
        add: "增加",
        state: "完成",
        type: "BUG",
        time: "1",
        final_text_list: [],
        final_text: "",
        day_key: "",
        yesterday_key: "",
        yesterday_list: "",
        yesterday_text: "",
        show_yesterday: false
    },
    mounted() {
        let now = new Date()
        let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        this.day_key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        this.yesterday_key = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
        let saved_note = localStorage.getItem(this.day_key)
        if (saved_note) {
            this.final_text_list = JSON.parse(saved_note)
            this.makeNoteString()
        }
        let yesterday_saved_note = localStorage.getItem(this.yesterday_key)
        if (yesterday_saved_note) {
            this.yesterday_list = JSON.parse(yesterday_saved_note)
            this.get_yesterday()
        }
    },
    methods: {
        save() {
            if (!this.note) {
                alert("日志内容不能为空")
                return false
            }
            let _tmp = { add: this.add, day: this.day, note: this.note, state: this.state, type: this.type, time: this.time }
            this.final_text_list.push(_tmp)
            this.note = "";
            localStorage.setItem(this.day_key, JSON.stringify(this.final_text_list))
            this.makeNoteString();
        },
        makeNoteString() {
            this.final_text = '';
            let _today_str = "今日工作:\n";
            let _tomorrow_str = "明日计划:\n";
            for (let i = 0; i < this.final_text_list.length; i++) {
                let item = this.final_text_list[i];
                let _str = `【${item.add}】 ${i + 1}、 ${item.note} 【${item.type}】【${item.time}H】【${item.state}】\n`
                if (item.day == '今日') {
                    _today_str += _str
                } else {
                    _tomorrow_str += _str
                }
            }

            _today_str.length > 6 ? this.final_text += _today_str : ''
            _tomorrow_str.length > 6 ? this.final_text += _tomorrow_str : ''


        },
        get_yesterday() {
            this.yesterday_text = '';
            let _today_str = "今日工作:\n";
            let _tomorrow_str = "明日计划:\n";
            for (let i = 0; i < this.yesterday_list.length; i++) {
                let item = this.yesterday_list[i];
                let _str = `【${item.add}】 ${i + 1}.  ${item.note} 【${item.type}】【${item.time}H】【${item.state}】\n`
                if (item.day == '今日') {
                    _today_str += _str
                } else {
                    _tomorrow_str += _str
                }
            }

            _today_str.length > 6 ? this.yesterday_text += _today_str : ''
            _tomorrow_str.length > 6 ? this.yesterday_text += _tomorrow_str : ''
        }

    },
})
