import IDisplayContext = etch.drawing.IDisplayContext;
import Point = etch.primitives.Point;
import {PostEffect} from '../PostEffect';
import {IApp} from "../../../IApp";

declare var App: IApp;

export class Chomp extends PostEffect {

    public Effect: Tone.Filter;
    public Params: ChompParams;
    public Defaults: ChompParams;
    public Timer;

    Init(drawTo: IDisplayContext): void {

        this.BlockName = App.L10n.Blocks.Effect.Blocks.Chomp.name;

        this.Defaults = {
            rate: 13,
            Q: 0.6,
            gain: 15
        };
        this.PopulateParams();

        this.Effect = new Tone.Filter({
            "type" : "peaking",
            "frequency" : Math.round(101-this.Params.rate),
            "rolloff" : -12,
            "Q" : this.Params.Q,
            "gain" : this.Params.gain
        });

        super.Init(drawTo);

        // Define Outline for HitTest
        this.Outline.push(new Point(-1, 0),new Point(0, -1),new Point(1, 0),new Point(1, 1),new Point(0, 2),new Point(-1, 2));

        this.SetFrequency();
    }

    SetFrequency() {
        var me = this;

        this.Timer = setTimeout(function() {
            if (me.Effect) {
                me.Effect.frequency.value = 100 + Math.round(Math.random()*10000);
                me.SetFrequency();
            }

        }, this.Params.rate);
    }


    Draw() {
        super.Draw();
        this.DrawSprite(this.BlockName);
    }

    Dispose(){
        clearTimeout(this.Timer);
        this.Effect.dispose();
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);
        var val = value;

        if (param == "rate") {
            val = Math.round(101-val);
        } else if (param == "Q") {
            this.Effect.Q.value = val;
        } else if (param == "gain") {
            this.Effect.gain.value = val;
        }

        this.Params[param] = val;
    }

    UpdateOptionsForm() {
        super.UpdateOptionsForm();

        this.OptionsForm =
        {
            "name": App.L10n.Blocks.Effect.Blocks.Chomp.name,
            "parameters": [

                {
                    "type" : "slider",
                    "name": "Rate",
                    "setting": "rate",
                    "props": {
                        "value": Math.round(101-this.Params.rate),
                        "min": 1,
                        "max": 100,
                        "quantised": true,
                        "centered": false
                    }
                },

                {
                    "type" : "slider",
                    "name": "Width",
                    "setting": "Q",
                    "props": {
                        "value": this.Params.Q,
                        "min": 0.1,
                        "max": 5,
                        "quantised": false,
                        "centered": false
                    }
                },

                {
                    "type" : "slider",
                    "name": "Gain",
                    "setting": "gain",
                    "props": {
                        "value": this.Params.gain,
                        "min": 0,
                        "max": 20,
                        "quantised": false,
                        "centered": false
                    }
                }
            ]
        };
    }
}
