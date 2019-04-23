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
            this.final_text = this.make_note_string(this.final_text_list)
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
            let _str = this.make_note_string(this.final_text_list);
            this.final_text = _str;

            this.note = "";
            localStorage.setItem(this.day_key, JSON.stringify(this.final_text_list))
        },
        make_note_string(note_list=[]) {
            let _final_text = '';
            let _today_str = "今日工作:\n";
            let _tomorrow_str = "明日计划:\n";
            let _today_count =1;
            let _tomorrow_count = 1;
            for (let i = 0; i < note_list.length; i++) {
                let item = note_list[i];       
                if (item.day == '今日') {
                    let _str = `【${item.add}】${_today_count}、${item.note}【${item.type}】【${item.time}H】【${item.state}】\n`
                    _today_str += _str
                } else {
                    let _str = `【${item.add}】${_tomorrow_count}、${item.note}【${item.type}】【${item.time}H】\n`
                    _tomorrow_str += _str
                }
            }

            _today_str.length > 6 ? _final_text += _today_str : ''
            _tomorrow_str.length > 6 ? _final_text += _tomorrow_str : ''
            return _final_text
        },
        get_yesterday() {
            let _str = this.make_note_string(this.yesterday_list)
            this.yesterday_text = _str;   
        },
        write_to_page() {
            let _this = this
            chrome.tabs.getSelected(function callback(tab) {
                chrome.tabs.sendMessage(tab.id, { greeting: _this.final_text }, function (response) {
                    console.log(response);
                });
            })

        },
        clear_all_note(){
            let d = confirm("你确定要删除吗, 不可恢复")
            if(d){
                localStorage.removeItem(this.day_key)
                this.final_text = "";
            }      
        }
    },
})
