import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  anchorClicked(event: MouseEvent)
  {        
    var target = event.srcElement.id;

    var $li = $('#' + target.replace("chevron","li")).parent(); 

    if ($li.is('.active')) {
        $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $('#sidebar-menu').find('li').removeClass('active active-sm');
                $('#sidebar-menu').find('li ul').slideUp();
            }
            
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
            });
        }
  }

}
